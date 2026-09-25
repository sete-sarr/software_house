import { Card } from "@/components/ui/card";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

interface JobOfferFormValues {
  slug: string;
  title: string;
  department?: string | null;
  location?: string | null;
  type: string;
  description: string;
  requirements?: string | null;
  status: string;
}

interface JobOfferFormProps {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: JobOfferFormValues;
  submitLabel: string;
}

export function JobOfferForm({ action, defaultValues, submitLabel }: JobOfferFormProps) {
  return (
    <Card>
      <form action={action} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-sm font-medium text-foreground">
              Titre *
            </label>
            <Input id="title" name="title" required defaultValue={defaultValues?.title} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="slug" className="text-sm font-medium text-foreground">
              Slug *
            </label>
            <Input id="slug" name="slug" required defaultValue={defaultValues?.slug} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="department" className="text-sm font-medium text-foreground">
              Département
            </label>
            <Input id="department" name="department" defaultValue={defaultValues?.department ?? ""} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="location" className="text-sm font-medium text-foreground">
              Lieu
            </label>
            <Input id="location" name="location" defaultValue={defaultValues?.location ?? ""} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="type" className="text-sm font-medium text-foreground">
              Type de contrat *
            </label>
            <Select id="type" name="type" required defaultValue={defaultValues?.type ?? "CDI"}>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="FREELANCE">Freelance</option>
              <option value="STAGE">Stage</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="status" className="text-sm font-medium text-foreground">
              Statut
            </label>
            <Select id="status" name="status" defaultValue={defaultValues?.status ?? "DRAFT"}>
              <option value="DRAFT">Brouillon</option>
              <option value="PUBLISHED">Publiée</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="description" className="text-sm font-medium text-foreground">
              Description du poste *
            </label>
            <Textarea
              id="description"
              name="description"
              rows={6}
              required
              defaultValue={defaultValues?.description}
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="requirements" className="text-sm font-medium text-foreground">
              Profil recherché
            </label>
            <Textarea
              id="requirements"
              name="requirements"
              rows={4}
              defaultValue={defaultValues?.requirements ?? ""}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit">{submitLabel}</Button>
          <ButtonLink href="/admin/jobs" variant="secondary">
            Annuler
          </ButtonLink>
        </div>
      </form>
    </Card>
  );
}
