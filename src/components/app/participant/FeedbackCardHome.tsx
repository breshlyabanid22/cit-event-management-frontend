export default function FeedbackCardHome() {
    return (
        <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">Feedback Card</p>
            <p className="text-md font-light">
                You have received <span className="text-success">10</span>{" "}
                feedbacks
            </p>
        </div>
    );
}
