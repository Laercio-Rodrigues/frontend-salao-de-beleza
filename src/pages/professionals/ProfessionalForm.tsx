import { useState, type SyntheticEvent } from "react";
import { Button, TextField } from "../../components/ui";
import type { Professional, ProfessionalInput } from "./professionals.api";

interface ProfessionalFormProps {
  initialData?: Professional;
  onSubmit: (data: ProfessionalInput) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function ProfessionalForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: ProfessionalFormProps) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [specialties, setSpecialties] = useState(
    initialData?.specialties?.join(", ") ?? "",
  );
  const [workStart, setWorkStart] = useState(initialData?.workStart ?? "");
  const [workEnd, setWorkEnd] = useState(initialData?.workEnd ?? "");

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    onSubmit({
      name,
      specialties: specialties
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      workStart,
      workEnd,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <TextField
        label="Nome"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
        autoFocus
      />
      <TextField
        label="Especialidades (separadas por vírgula)"
        value={specialties}
        onChange={(event) => setSpecialties(event.target.value)}
        placeholder="corte, coloração, escova"
      />
      <TextField
        label="Início do expediente"
        value={workStart}
        onChange={(event) => setWorkStart(event.target.value)}
        required
        placeholder="09:00"
      />
      <TextField
        label="Fim do expediente"
        value={workEnd}
        onChange={(event) => setWorkEnd(event.target.value)}
        required
        placeholder="18:00"
      />

      <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
        <Button type="button" $variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
