
import { ChartsSection, LatestRecords, LatestNotes } from ".."

export const Dashboard = () => {

    return (
        <div className="mt-12">
            <ChartsSection />

            <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                <LatestRecords />
                <LatestNotes />
            </div>
        </div>
    )
}