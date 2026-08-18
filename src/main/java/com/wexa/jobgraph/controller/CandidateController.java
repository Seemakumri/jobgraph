package com.wexa.jobgraph.controller;

import com.wexa.jobgraph.service.CandidateService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class CandidateController {

    private final CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @GetMapping("/api/candidates")
    public List<Map<String, Object>> getCandidates() {
        return candidateService.getAllCandidates();
    }
}