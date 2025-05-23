package com.scsa.tadak.reply;

import com.scsa.tadak.user.SiteUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/replies")
@RequiredArgsConstructor
public class ReplyController {

    private final ReplyService replyService;

    // 답장 작성
    @PostMapping
    public ReplyDto writeReply(@AuthenticationPrincipal SiteUserDetails userDetails,
                                @RequestBody ReplyRequest request) {
        Long userId = userDetails.getSiteUser().getId();
        return replyService.writeReply(request.getLetterId(), userId, request.getContent());
    }

    @GetMapping("/{letterId}")
    public ReplyDto getReplyByLetter(@PathVariable("letterId") Long letterId) {
        return replyService.getReplyByLetterId(letterId);
    }

}
