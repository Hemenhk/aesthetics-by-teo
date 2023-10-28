import SingleTreatment from "@/components/treatments/SingleTreatment";

type Props = {
  params: { treatmentId: string };
};

export default function TreatmentPage({ params }: Props) {
  return (
    <>
      <SingleTreatment treatmentId={params.treatmentId} />
    </>
  );
}
