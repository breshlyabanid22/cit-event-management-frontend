export default function FeedbackPage() {
  return (
    <div>
      <header className="mb-6 flex w-full items-center justify-between">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Feedback</p>
          <p className="text-md font-light">Please tell us what you think</p>
        </div>
      </header>
      <body className="grid grid-cols-1 gap-4">
        <div className="col-span-1 flex flex-col gap-4"></div>
      </body>
    </div>
  );
}