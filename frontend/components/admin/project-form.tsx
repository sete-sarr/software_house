import { Card } from "@/components/ui/card";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

interface ProjectFormValues {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  problem?: string | null;
  solution?: string | null;
  result?: string | null;
  coverImage?: string | null;
  gallery?: string[] | null;
  status: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

interface ProjectFormProps {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: ProjectFormValues;
  submitLabel: string;
}

export function ProjectForm({ action, defaultValues, submitLabel }: ProjectFormProps) {
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
            <label htmlFor="category" className="text-sm font-medium text-foreground">
              Catégorie *
            </label>
            <Input id="category" name="category" required defaultValue={defaultValues?.category} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="status" className="text-sm font-medium text-foreground">
              Statut
            </label>
            <Select id="status" name="status" defaultValue={defaultValues?.status ?? "DRAFT"}>
              <option value="DRAFT">Brouillon</option>
              <option value="PUBLISHED">Publié</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="shortDescription" className="text-sm font-medium text-foreground">
              Description courte *
            </label>
            <Textarea
              id="shortDescription"
              name="shortDescription"
              rows={2}
              required
              defaultValue={defaultValues?.shortDescription}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="problem" className="text-sm font-medium text-foreground">
              Problème
            </label>
            <Textarea id="problem" name="problem" rows={4} defaultValue={defaultValues?.problem ?? ""} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="solution" className="text-sm font-medium text-foreground">
              Solution
            </label>
            <Textarea
              id="solution"
              name="solution"
              rows={4}
              defaultValue={defaultValues?.solution ?? ""}
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="result" className="text-sm font-medium text-foreground">
              Résultat obtenu
            </label>
            <Textarea id="result" name="result" rows={3} defaultValue={defaultValues?.result ?? ""} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="coverImage" className="text-sm font-medium text-foreground">
              Image de couverture (URL)
            </label>
            <Input id="coverImage" name="coverImage" defaultValue={defaultValues?.coverImage ?? ""} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="gallery" className="text-sm font-medium text-foreground">
              Galerie (une URL par ligne)
            </label>
            <Textarea
              id="gallery"
              name="gallery"
              rows={3}
              defaultValue={defaultValues?.gallery?.join("\n") ?? ""}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="seoTitle" className="text-sm font-medium text-foreground">
              Titre SEO
            </label>
            <Input id="seoTitle" name="seoTitle" defaultValue={defaultValues?.seoTitle ?? ""} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="seoDescription" className="text-sm font-medium text-foreground">
              Description SEO
            </label>
            <Input
              id="seoDescription"
              name="seoDescription"
              defaultValue={defaultValues?.seoDescription ?? ""}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit">{submitLabel}</Button>
          <ButtonLink href="/admin/projects" variant="secondary">
            Annuler
          </ButtonLink>
        </div>
      </form>
    </Card>
  );
}
