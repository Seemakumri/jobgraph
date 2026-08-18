package com.wexa.jobgraph.controller;
import com.wexa.jobgraph.service.CandidateService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final CandidateService candidateService;

    public JobController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @GetMapping("/{jobId}/matches")
    public List<Map<String, Object>> getJobMatches(
            @PathVariable String jobId) {

        return candidateService.getJobMatches(jobId);
    }

    @GetMapping
    public List<Map<String, Object>> getAllJobs() {

        return candidateService.getAllJobs();
    }

    @GetMapping("/{jobId}/project-matches")
    public List<Map<String, Object>> getProjectBasedMatches(
            @PathVariable String jobId) {

        return candidateService.getProjectBasedMatches(jobId);
    }
}