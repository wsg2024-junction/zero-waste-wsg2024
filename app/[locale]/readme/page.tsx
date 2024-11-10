export default function ReadmePage() {
    return (
        <article className="prose max-w-none mx-auto p-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-8">How it Works</h1>

            <section>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Overview</h2>
                <p className="text-gray-600">
                    This suite of applications optimizes food production with real-time updates, gamified
                    feedback, and auto-translated messaging across stages. Make sure to see its full potential
                    by opening multiple tabs to see realtime updates.
                </p>
            </section>

            <section className="mt-10">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Applications</h2>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Dashboard</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Displayed on TVs in each area, showing batch updates and status.</li>
                        <li>Kanban board with columns for stages and cards for batches.</li>
                        <li>
                            Leaderboard for gamified preproduction scoring based on accuracy and consistency.
                        </li>
                        <li>
                            Manager messages for the selected area are displayed, with rotating language
                            support.
                        </li>
                    </ul>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Tablet App (Preproduction)</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Workers enter sample weights and receive instant feedback.</li>
                        <li>
                            Gamified scoring system with rewards for accuracy; visual feedback (e.g., emojis).
                        </li>
                    </ul>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Manager App</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Interactive Kanban board with detailed batch stats.</li>
                        <li>Auto-translated chat across production areas.</li>
                        <li>Set area statuses and notify teams of adjustments.</li>
                        <li>Send messages to areas.</li>
                    </ul>
                </div>
            </section>

            <section className="mt-10">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Key Features</h2>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Communication & Translation</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Auto-translated chat for clear cross-team communication.</li>
                        <li>Real-time, stage-specific messaging for focused updates.</li>
                    </ul>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Gamification & Feedback</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Accurate scoring in preproduction with rewards for streaks.</li>
                        <li>Feedback on sample weights to improve production quality.</li>
                    </ul>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                        Production Insights & Adjustments
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Real-time batch and weight data for proactive quality control.</li>
                        <li>Adjust production based on delays and storage data to optimize flow.</li>
                    </ul>
                </div>
            </section>
        </article>
    );
}
