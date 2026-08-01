const metrics = [
  { label: "Revenue today", value: "$2,840", delta: "+12.4% vs last Saturday" },
  { label: "Pets scheduled", value: "24", delta: "91% capacity utilized" },
  { label: "Average ticket", value: "$118", delta: "+$9 this month" },
  { label: "Rebooking rate", value: "76%", delta: "+6 points this quarter" }
];

const appointments = [
  { time: "8:00 AM", pet: "Winston", service: "Doodle full groom", groomer: "Jessica" },
  { time: "9:15 AM", pet: "Luna", service: "Bath + deshed", groomer: "Marcus" },
  { time: "10:00 AM", pet: "Milo", service: "Puppy introduction", groomer: "Jessica" },
  { time: "11:30 AM", pet: "Bella", service: "Full groom", groomer: "Ana" }
];

const insights = [
  "18 pets are overdue based on their normal visit interval.",
  "Oatmeal shampoo is projected to fall below par stock in 6 days.",
  "Thursday afternoon capacity is only 54% booked.",
  "Doodle services produce the highest gross profit this month."
];

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <header className="header">
        <div>
          <div className="eyebrow">Owner command center</div>
          <h1>Good morning, TailOS Salon</h1>
          <p className="muted">Live operational snapshot</p>
        </div>
        <button className="button">New appointment</button>
      </header>

      <section className="grid" aria-label="Key performance indicators">
        {metrics.map((metric) => (
          <article className="card" key={metric.label}>
            <div className="muted">{metric.label}</div>
            <div className="metric">{metric.value}</div>
            <div className="delta">{metric.delta}</div>
          </article>
        ))}
      </section>

      <section className="section-grid">
        <article className="card">
          <div className="eyebrow">Schedule</div>
          <h2>Next appointments</h2>
          <div className="list">
            {appointments.map((appointment) => (
              <div className="row" key={`${appointment.time}-${appointment.pet}`}>
                <div>
                  <strong>{appointment.time} · {appointment.pet}</strong>
                  <div className="muted">{appointment.service}</div>
                </div>
                <span className="badge">{appointment.groomer}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="card">
          <div className="eyebrow">TailOS intelligence</div>
          <h2>Needs attention</h2>
          <div className="list">
            {insights.map((insight) => <div className="row" key={insight}>{insight}</div>)}
          </div>
        </article>
      </section>
    </div>
  );
}
