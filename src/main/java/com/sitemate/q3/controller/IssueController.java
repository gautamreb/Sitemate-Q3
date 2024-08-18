package com.sitemate.q3.controller;

import com.sitemate.q3.model.Issue;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://localhost:3000")
public class IssueController {

    private List<Issue> issues = new ArrayList<>();

    // Create data
    @PostMapping()
    public Issue createIssue(@RequestBody Issue issue) {
        issue.setId((long) (issues.size() + 1)); // Simplified ID generation
        issues.add(issue);
        return issue;
    }

    // Fetch the data using ID
    @GetMapping("/{id}")
    public Issue getIssue(@PathVariable Long id) {
        return issues.stream().filter(issue -> issue.getId().equals(id)).findFirst().orElse(null);
    }

    // Update data using id
    @PutMapping("/{id}")
    public Issue updateIssue(@PathVariable Long id, @RequestBody Issue updatedIssue) {
        Issue issue = issues.stream().filter(i -> i.getId().equals(id)).findFirst().orElse(null);
        if (issue != null) {
            issue.setTitle(updatedIssue.getTitle());
            issue.setDescription(updatedIssue.getDescription());
        }
        return issue;
    }

    // Delete data using ID
    @DeleteMapping("/{id}")
    public String deleteIssue(@PathVariable Long id) {
        issues.removeIf(issue -> issue.getId().equals(id));
        return "Deleted issue with id " + id;
    }
}
