interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
        <strong className="font-bold">Error: </strong>
        <span>{message}</span>
      </div>
    </div>
  );
}
