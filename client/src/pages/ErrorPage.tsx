import { TypographyH1 } from "@/components/ui/typography";

function ErrorPage({ message }: { message?: string }) {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-2">
      <TypographyH1>Uh-oh!</TypographyH1>
      <div className="flex flex-col items-center">
        <p className="font-bold text-muted">An error has occured:</p>
        {message && <p className="text-muted">{message}</p>}
      </div>
    </div>
  );
}

export default ErrorPage;
