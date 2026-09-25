import { Card } from "@/components/ui/card";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface TeamMemberFormValues {
  firstName: string;
  lastName: string;
  role: string;
  bio?: string | null;
  photo?: string | null;
  linkedin?: string | null;
  github?: string | null;
  isActive?: boolean;
}

interface TeamMemberFormProps {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: TeamMemberFormValues;
  submitLabel: string;
}

export function TeamMemberForm({ action, defaultValues, submitLabel }: TeamMemberFormProps) {
  return (
    <Card>
      <form action={action} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="firstName" className="text-sm font-medium text-foreground">
              Prénom *
            </label>
            <Input
              id="firstName"
              name="firstName"
              required
              defaultValue={defaultValues?.firstName}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="lastName" className="text-sm font-medium text-foreground">
              Nom *
            </label>
            <Input id="lastName" name="lastName" required defaultValue={defaultValues?.lastName} />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="role" className="text-sm font-medium text-foreground">
              Rôle *
            </label>
            <Input id="role" name="role" required defaultValue={defaultValues?.role} />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="bio" className="text-sm font-medium text-foreground">
              Bio
            </label>
            <Textarea id="bio" name="bio" rows={4} defaultValue={defaultValues?.bio ?? ""} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="photo" className="text-sm font-medium text-foreground">
              Photo (URL)
            </label>
            <Input id="photo" name="photo" defaultValue={defaultValues?.photo ?? ""} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="linkedin" className="text-sm font-medium text-foreground">
              LinkedIn
            </label>
            <Input id="linkedin" name="linkedin" defaultValue={defaultValues?.linkedin ?? ""} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="github" className="text-sm font-medium text-foreground">
              GitHub
            </label>
            <Input id="github" name="github" defaultValue={defaultValues?.github ?? ""} />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-foreground">
          <Checkbox name="isActive" defaultChecked={defaultValues?.isActive ?? true} />
          Actif (visible sur le site)
        </label>

        <div className="flex gap-3">
          <Button type="submit">{submitLabel}</Button>
          <ButtonLink href="/admin/team" variant="secondary">
            Annuler
          </ButtonLink>
        </div>
      </form>
    </Card>
  );
}
