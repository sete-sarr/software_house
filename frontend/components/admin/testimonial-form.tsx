import { Card } from "@/components/ui/card";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface TestimonialFormValues {
  authorName: string;
  authorRole?: string | null;
  company?: string | null;
  content: string;
  avatar?: string | null;
  isPublished?: boolean;
}

interface TestimonialFormProps {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: TestimonialFormValues;
  submitLabel: string;
}

export function TestimonialForm({ action, defaultValues, submitLabel }: TestimonialFormProps) {
  return (
    <Card>
      <form action={action} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="authorName" className="text-sm font-medium text-foreground">
              Nom de l&apos;auteur *
            </label>
            <Input
              id="authorName"
              name="authorName"
              required
              defaultValue={defaultValues?.authorName}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="authorRole" className="text-sm font-medium text-foreground">
              Fonction
            </label>
            <Input
              id="authorRole"
              name="authorRole"
              defaultValue={defaultValues?.authorRole ?? ""}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="company" className="text-sm font-medium text-foreground">
              Entreprise
            </label>
            <Input id="company" name="company" defaultValue={defaultValues?.company ?? ""} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="avatar" className="text-sm font-medium text-foreground">
              Avatar (URL)
            </label>
            <Input id="avatar" name="avatar" defaultValue={defaultValues?.avatar ?? ""} />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="content" className="text-sm font-medium text-foreground">
              Témoignage *
            </label>
            <Textarea
              id="content"
              name="content"
              rows={5}
              required
              defaultValue={defaultValues?.content}
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-foreground">
          <Checkbox name="isPublished" defaultChecked={defaultValues?.isPublished ?? false} />
          Publié (visible sur le site)
        </label>

        <div className="flex gap-3">
          <Button type="submit">{submitLabel}</Button>
          <ButtonLink href="/admin/testimonials" variant="secondary">
            Annuler
          </ButtonLink>
        </div>
      </form>
    </Card>
  );
}
