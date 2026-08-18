// import { useEffect, useState } from "react";
// import "./App.css";

// interface Job {
//   jobId: string;
//   title: string;
//   company: string;
// }

// interface CandidateMatch {
//   candidateId: string;
//   candidate: string;
//   projects: string[];
//   matchingSkills: string[];
//   matchingSkillsCount: number;
// }

// function App() {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [selectedJob, setSelectedJob] = useState("");
//   const [matches, setMatches] = useState<CandidateMatch[]>([]);

//   const [loadingJobs, setLoadingJobs] = useState(true);
//   const [loadingMatches, setLoadingMatches] = useState(false);
//   const [error, setError] = useState("");

//   // Load jobs
//   useEffect(() => {
//     fetch("http://localhost:8080/api/jobs")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Unable to load jobs");
//         }

//         return response.json();
//       })
//       .then((data: Job[]) => {
//         setJobs(data);

//         if (data.length > 0) {
//           setSelectedJob(data[0].jobId);
//         }
//       })
//       .catch(() => {
//         setError(
//           "Unable to connect to the backend. Please make sure Spring Boot is running."
//         );
//       })
//       .finally(() => {
//         setLoadingJobs(false);
//       });
//   }, []);

//   // Load candidate matches
//   useEffect(() => {
//     if (!selectedJob) {
//       return;
//     }

//     setLoadingMatches(true);
//     setError("");

//     fetch(
//       `http://localhost:8080/api/jobs/${selectedJob}/project-matches`
//     )
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Unable to load candidate matches");
//         }

//         return response.json();
//       })
//       .then((data: CandidateMatch[]) => {
//         setMatches(data);
//       })
//       .catch(() => {
//         setMatches([]);
//         setError("Unable to load candidate matches.");
//       })
//       .finally(() => {
//         setLoadingMatches(false);
//       });
//   }, [selectedJob]);

//   const selectedJobDetails = jobs.find(
//     (job) => job.jobId === selectedJob
//   );

//   const calculateMatchPercentage = (
//     matchingSkillsCount: number
//   ) => {
//     if (!selectedJobDetails) {
//       return 0;
//     }

//     // Temporary simple score.
//     // We will improve this later using required skills from the backend.
//     return Math.min(matchingSkillsCount * 25, 100);
//   };

//   return (
//     <div className="app">

//       {/* Header */}
//       <header className="header">
//         <div>
//           <h1>JobGraph</h1>
//           <p>Graph-powered candidate matching</p>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="container">

//         <section className="hero">
//           <div>
//             <span className="badge">COGNODB • GRAPH SEARCH</span>

//             <h2>
//               Find the right candidate
//               <br />
//               through their experience.
//             </h2>

//             <p>
//               Explore candidates by connecting jobs, skills and
//               real project experience.
//             </p>
//           </div>
//         </section>

//         {/* Job Selection */}
//         <section className="job-section">

//           <label htmlFor="job">
//             Select a job
//           </label>

//           {loadingJobs ? (
//             <div className="loading">
//               Loading jobs...
//             </div>
//           ) : (
//             <select
//               id="job"
//               value={selectedJob}
//               onChange={(event) =>
//                 setSelectedJob(event.target.value)
//               }
//             >
//               {jobs.map((job) => (
//                 <option
//                   key={job.jobId}
//                   value={job.jobId}
//                 >
//                   {job.title} — {job.company}
//                 </option>
//               ))}
//             </select>
//           )}

//         </section>

//         {/* Error */}
//         {error && (
//           <div className="error">
//             {error}
//           </div>
//         )}

//         {/* Results */}
//         <section className="results">

//           <div className="results-header">
//             <div>
//               <h3>Candidate Matches</h3>

//               {selectedJobDetails && (
//                 <p>
//                   {selectedJobDetails.title}
//                 </p>
//               )}
//             </div>

//             {!loadingMatches && (
//               <span className="count">
//                 {matches.length} candidates
//               </span>
//             )}
//           </div>

//           {loadingMatches ? (
//             <div className="empty">
//               <div className="spinner"></div>
//               <p>Finding matching candidates...</p>
//             </div>
//           ) : matches.length === 0 ? (
//             <div className="empty">
//               <h3>No candidates found</h3>
//               <p>
//                 There are currently no candidates matching
//                 this job through their project experience.
//               </p>
//             </div>
//           ) : (
//             <div className="candidate-grid">

//               {matches.map((candidate) => {

//                 const score =
//                   calculateMatchPercentage(
//                     candidate.matchingSkillsCount
//                   );

//                 return (
//                   <article
//                     className="candidate-card"
//                     key={candidate.candidateId}
//                   >

//                     <div className="candidate-top">

//                       <div className="avatar">
//                         {candidate.candidate
//                           .charAt(0)
//                           .toUpperCase()}
//                       </div>

//                       <div>
//                         <h3>{candidate.candidate}</h3>

//                         <p>
//                           Candidate ID:{" "}
//                           {candidate.candidateId}
//                         </p>
//                       </div>

//                       <div className="score">
//                         <strong>{score}%</strong>
//                         <span>match</span>
//                       </div>

//                     </div>

//                     <div className="card-content">

//                       <div className="info-section">

//                         <h4>Matching Skills</h4>

//                         <div className="skills">
//                           {candidate.matchingSkills.map(
//                             (skill) => (
//                               <span
//                                 className="skill"
//                                 key={skill}
//                               >
//                                 {skill}
//                               </span>
//                             )
//                           )}
//                         </div>

//                       </div>

//                       <div className="info-section">

//                         <h4>Relevant Projects</h4>

//                         <ul>
//                           {candidate.projects.map(
//                             (project) => (
//                               <li key={project}>
//                                 {project}
//                               </li>
//                             )
//                           )}
//                         </ul>

//                       </div>

//                     </div>

//                   </article>
//                 );
//               })}

//             </div>
//           )}

//         </section>

//       </main>

//       <footer>
//         <p>
//           JobGraph • Powered by Spring Boot + CognoDB
//         </p>
//       </footer>

//     </div>
//   );
// }

// export default App;

import { useEffect, useMemo, useState } from "react";
import "./App.css";

interface Job {
  jobId: string;
  title: string;
  company: string;
}

interface CandidateMatch {
  candidateId: string;
  candidate: string;
  projects: string[];
  matchingSkills: string[];
  matchingSkillsCount: number;
}

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [matches, setMatches] = useState<CandidateMatch[]>([]);

  const [search, setSearch] = useState("");
  const [minimumScore, setMinimumScore] = useState(0);

  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/jobs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load jobs");
        }

        return response.json();
      })
      .then((data: Job[]) => {
        setJobs(data);

        if (data.length > 0) {
          setSelectedJob(data[0].jobId);
        }
      })
      .catch(() => {
        setError(
          "Unable to connect to the backend. Please make sure Spring Boot is running."
        );
      })
      .finally(() => {
        setLoadingJobs(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedJob) {
      return;
    }

    setLoadingMatches(true);
    setError("");

    fetch(
      `http://localhost:8080/api/jobs/${selectedJob}/project-matches`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load candidate matches");
        }

        return response.json();
      })
      .then((data: CandidateMatch[]) => {
        setMatches(data);
      })
      .catch(() => {
        setMatches([]);
        setError("Unable to load candidate matches.");
      })
      .finally(() => {
        setLoadingMatches(false);
      });
  }, [selectedJob]);

  const selectedJobDetails = jobs.find(
    (job) => job.jobId === selectedJob
  );

  const calculateMatchPercentage = (
    matchingSkillsCount: number
  ) => {
    return Math.min(matchingSkillsCount * 25, 100);
  };

  const filteredCandidates = useMemo(() => {
    return matches.filter((candidate) => {
      const score = calculateMatchPercentage(
        candidate.matchingSkillsCount
      );

      const matchesSearch = candidate.candidate
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesSearch && score >= minimumScore;
    });
  }, [matches, search, minimumScore]);

  const averageScore =
    matches.length > 0
      ? Math.round(
          matches.reduce(
            (total, candidate) =>
              total +
              calculateMatchPercentage(
                candidate.matchingSkillsCount
              ),
            0
          ) / matches.length
        )
      : 0;

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div className="header-inner">

          <div className="brand">
            <div className="brand-logo">JG</div>

            <div>
              <h1>JobGraph</h1>
              <p>Candidate Intelligence Platform</p>
            </div>
          </div>

          <div className="header-status">
            <span className="status-dot"></span>
            Backend Connected
          </div>

        </div>
      </header>

      <main className="container">

        {/* Hero */}
        <section className="hero">

          <div className="hero-content">

            <span className="badge">
              COGNODB · GRAPH SEARCH
            </span>

            <h2>
              Find the right candidate
              <br />
              through their experience.
            </h2>

            <p>
              Discover candidates by connecting jobs, skills,
              and real-world project experience.
            </p>

          </div>

        </section>

        {/* Job Selection */}
        <section className="control-panel">

          <div className="control-left">

            <label htmlFor="job">
              Select Job
            </label>

            {loadingJobs ? (
              <div className="loading-text">
                Loading available jobs...
              </div>
            ) : (
              <select
                id="job"
                value={selectedJob}
                onChange={(event) =>
                  setSelectedJob(event.target.value)
                }
              >
                {jobs.map((job) => (
                  <option
                    key={job.jobId}
                    value={job.jobId}
                  >
                    {job.title} — {job.company}
                  </option>
                ))}
              </select>
            )}

          </div>

          {selectedJobDetails && (
            <div className="selected-job">

              <span className="job-label">
                CURRENT ROLE
              </span>

              <strong>
                {selectedJobDetails.title}
              </strong>

              <span>
                {selectedJobDetails.company}
              </span>

            </div>
          )}

        </section>

        {/* Error */}
        {error && (
          <div className="error">
            <strong>Something went wrong</strong>
            <span>{error}</span>
          </div>
        )}

        {/* Dashboard Summary */}
        {!loadingMatches && matches.length > 0 && (
          <section className="summary-grid">

            <div className="summary-card">
              <span>Total Candidates</span>
              <strong>{matches.length}</strong>
              <small>Matching project experience</small>
            </div>

            <div className="summary-card">
              <span>Average Match</span>
              <strong>{averageScore}%</strong>
              <small>Across all candidates</small>
            </div>

            <div className="summary-card">
              <span>Strong Matches</span>
              <strong>
                {
                  matches.filter(
                    (candidate) =>
                      calculateMatchPercentage(
                        candidate.matchingSkillsCount
                      ) >= 75
                  ).length
                }
              </strong>
              <small>75% or higher</small>
            </div>

          </section>
        )}

        {/* Candidates */}
        <section className="results">

          <div className="results-header">

            <div>
              <span className="section-label">
                CANDIDATE DISCOVERY
              </span>

              <h3>
                Candidate Matches
              </h3>

              {selectedJobDetails && (
                <p>
                  Candidates ranked by relevant skills and
                  project experience for{" "}
                  <strong>
                    {selectedJobDetails.title}
                  </strong>
                </p>
              )}
            </div>

            {!loadingMatches && matches.length > 0 && (
              <span className="count">
                {filteredCandidates.length} candidates
              </span>
            )}

          </div>

          {/* Search + Filter */}
          {!loadingMatches && matches.length > 0 && (
            <div className="filters">

              <div className="search-box">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />
              </div>

              <select
                value={minimumScore}
                onChange={(event) =>
                  setMinimumScore(
                    Number(event.target.value)
                  )
                }
              >
                <option value={0}>
                  All matches
                </option>

                <option value={50}>
                  50%+ match
                </option>

                <option value={75}>
                  75%+ match
                </option>

                <option value={100}>
                  100% match
                </option>
              </select>

            </div>
          )}

          {/* Loading */}
          {loadingMatches ? (
            <div className="empty">

              <div className="spinner"></div>

              <h3>
                Finding matching candidates
              </h3>

              <p>
                Analyzing project experience and skills...
              </p>

            </div>
          ) : filteredCandidates.length === 0 ? (
            <div className="empty">

              <div className="empty-icon">
                ⌕
              </div>

              <h3>
                No candidates found
              </h3>

              <p>
                Try selecting another job or changing
                your search filters.
              </p>

            </div>
          ) : (
            <div className="candidate-grid">

              {filteredCandidates.map((candidate) => {

                const score =
                  calculateMatchPercentage(
                    candidate.matchingSkillsCount
                  );

                return (
                  <article
                    className="candidate-card"
                    key={candidate.candidateId}
                  >

                    {/* Card Header */}
                    <div className="candidate-top">

                      <div className="avatar">
                        {candidate.candidate
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="candidate-info">

                        <h3>
                          {candidate.candidate}
                        </h3>

                        <p>
                          Candidate ID ·{" "}
                          {candidate.candidateId}
                        </p>

                      </div>

                      <div className="score">

                        <strong>
                          {score}%
                        </strong>

                        <span>
                          Match
                        </span>

                      </div>

                    </div>

                    {/* Score Bar */}
                    <div className="score-bar">
                      <div
                        className="score-fill"
                        style={{
                          width: `${score}%`,
                        }}
                      ></div>
                    </div>

                    {/* Card Content */}
                    <div className="card-content">

                      {/* Skills */}
                      <div className="info-section">

                        <div className="section-heading">

                          <h4>
                            Matching Skills
                          </h4>

                          <span>
                            {candidate.matchingSkillsCount}
                          </span>

                        </div>

                        <div className="skills">

                          {candidate.matchingSkills.map(
                            (skill) => (
                              <span
                                className="skill"
                                key={skill}
                              >
                                {skill}
                              </span>
                            )
                          )}

                        </div>

                      </div>

                      {/* Projects */}
                      <div className="info-section">

                        <div className="section-heading">
                          <h4>
                            Relevant Projects
                          </h4>
                        </div>

                        <ul className="projects">

                          {candidate.projects.map(
                            (project) => (
                              <li key={project}>
                                <span className="project-dot">
                                  ✓
                                </span>

                                {project}
                              </li>
                            )
                          )}

                        </ul>

                      </div>

                    </div>

                    {/* Footer */}
                    <div className="card-footer">

                      <span>
                        Graph-based match
                      </span>

                      <button>
                        View Candidate →
                      </button>

                    </div>

                  </article>
                );
              })}

            </div>
          )}

        </section>

      </main>

      <footer>
        <p>
          JobGraph · Powered by Spring Boot + CognoDB
        </p>
      </footer>

    </div>
  );
}

export default App;