import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import EcommerceMetrics from "../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "../components/ecommerce/MonthlyTarget";
import Button from "../components/ui/button/Button";
import CardDetails from "../components/dashboard-components/CardDetails";
import DonutPieChart from "../components/charts/pie/DonutPieChart";
import DataTable, { Column } from "../components/common/DataTable";
import SmsDetails from "../components/dashboard-components/SmsDetails";

const birthdays = [
  { id: 1, name: "John Doe", section: "5A", wishes: 15, initials: "JD" },
  { id: 2, name: "Jane Smith", section: "6B", wishes: 8, initials: "JS" },
  {
    id: 3,
    name: "Robert Johnson",
    section: "Staff",
    wishes: 23,
    initials: "RJ",
  },
  {
    id: 4,
    name: "Alan Border",
    section: "XB",
    wishes: 21,
    initials: "AB",
  },
];

type ClassRow = { id: string; code: string; name: string; description: string };
const demoClasses: ClassRow[] = [
  { id: "1", code: "CODE001", name: "Resource Alpha (Class)", description: "Description for Alpha resource for this tab." },
  { id: "2", code: "CODE002", name: "Resource Beta (Class)", description: "Description for Beta resource for this tab." },
  { id: "3", code: "CODE003", name: "Resource Gamma (Class)", description: "Description for Gamma resource for this tab." },
  { id: "4", code: "CODE004", name: "Resource Delta (Class)", description: "Description for Delta resource for this tab." },
  { id: "5", code: "CODE005", name: "Resource Epsilon (Class)", description: "Description for Epsilon resource for this tab." },
  { id: "6", code: "CODE006", name: "Resource Zeta (Class)", description: "Description for Zeta resource for this tab." },
];

const holidays = [
  {
    id: 1,
    title: "Summer Break Start",
    date: "June 20, 2025",
    chip: "2 months",
  },
  { id: 2, title: "Independence Day", date: "July 4, 2025", chip: "1 day" },
  { id: 3, title: "Back to School", date: "August 15, 2025", chip: "1 day" },
  { id: 4, title: "Labor Day", date: "September 1, 2025", chip: "1 day" },
];

export default function SchoolDashboard() {
  const classColumns: Column<ClassRow>[] = [
    { header: "Code", accessor: "code" },
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description", className: "max-w-[360px] truncate" },
  ];
  return (
    <>
      <PageMeta
        title="School Administration Dashboard"
        description="School overview and activities"
      />

      <div className="grid gap-4 md:gap-6">
        {false && (
          <div className="col-span-12 xl:col-span-4">
            <div className="rounded-2xl border border-gray-200 bg-brand-600/95 text-white dark:border-gray-800 dark:bg-brand-600/95 p-6 md:p-8">
              <div className="flex flex-col items-center">
                <div className="h-28 w-28 rounded-full bg-white/30 grid place-items-center text-white/90 text-xl">
                  S
                </div>
                <h2 className="mt-6 text-2xl font-semibold">
                  Greenfield Academy
                </h2>
                <p className="text-white/70 mt-1">
                  Excellence in Education Since 1987
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="rounded-xl bg-white/10 text-white/90 ring-1 ring-white/15 px-4 py-3 flex items-center gap-3">
                  <span className="inline-flex size-8 rounded-lg bg-white/15 items-center justify-center">
                    🏠
                  </span>
                  <span className="text-sm">Address</span>
                </div>
                <div className="rounded-xl bg-white/10 text-white/90 ring-1 ring-white/15 px-4 py-3 flex items-center gap-3">
                  <span className="inline-flex size-8 rounded-lg bg-white/15 items-center justify-center">
                    ☎️
                  </span>
                  <span className="text-sm">Contact</span>
                </div>
                <div className="rounded-xl bg-white/10 text-white/90 ring-1 ring-white/15 px-4 py-3 flex items-center gap-3">
                  <span className="inline-flex size-8 rounded-lg bg-white/15 items-center justify-center">
                    🏛️
                  </span>
                  <span className="text-sm">Administration</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full text-white ring-white/40 hover:bg-white/10"
                >
                  School Website
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="col-span-12 xl:col-span-8">
          <div className="grid grid-cols-12 gap-4 md:gap-6 items-stretch">
            {/* KPIs full width */}
            <div className="col-span-12">
              <CardDetails />
            </div>

            {/* Charts row */}
            <div className="col-span-12 xl:col-span-6">
              <ComponentCard title="SMS Sent (Last 7 Days)" className="h-full min-h-[460px]">
                <SmsDetails />
              </ComponentCard>
            </div>
            <div className="col-span-12 xl:col-span-6">
              <ComponentCard title="Today's Attendance" className="h-full min-h-[460px]">
                {/* <MonthlyTarget /> */}
                <DonutPieChart />

              </ComponentCard>
            </div>

            {/* Lists row */}
            <div className="col-span-12 xl:col-span-6">
              <ComponentCard title="Today's Birthdays">
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {birthdays.map((b) => (
                    <div
                      key={b.id}
                      className="flex items-center justify-between py-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-purple-500 grid place-items-center text-white font-semibold">
                          {b.initials}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {b.name}
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                            <span className="rounded-md ring-1 ring-gray-300 px-2 py-0.5 bg-white">
                              {b.section}
                            </span>
                            <span>{b.wishes} wishes</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                      >
                        <span className="mr-1">➤</span> Wish
                      </Button>
                    </div>
                  ))}
                </div>
              </ComponentCard>
            </div>

            <div className="col-span-12 xl:col-span-6">
              <ComponentCard title="Holiday Calendar">
                <div className="space-y-3">
                  {holidays.map((h) => (
                    <div
                      key={h.id}
                      className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-white/[0.03] px-4 py-3 ring-1 ring-gray-100 dark:ring-gray-800"
                    >
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-blue-500 grid place-items-center text-white">
                          📅
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {h.title}
                          </div>
                          <div className="text-xs text-gray-500">{h.date}</div>
                        </div>
                      </div>
                      <span className="text-xs rounded-full bg-white px-3 py-1 ring-1 ring-gray-300 text-gray-700">
                        {h.chip}
                      </span>
                    </div>
                  ))}
                </div>
              </ComponentCard>
            </div>

            {/* Data table demo */}
            <div className="col-span-12">
              <ComponentCard title="Existing Classes">
                <DataTable
                  data={demoClasses}
                  columns={classColumns}
                  rowKey={(r) => r.id}
                  initialPageSize={5}
                  showActions
                  onView={(row) => console.log("view", row)}
                  onEdit={(row) => console.log("edit", row)}
                  onDelete={(row) => console.log("delete", row)}
                />
              </ComponentCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
