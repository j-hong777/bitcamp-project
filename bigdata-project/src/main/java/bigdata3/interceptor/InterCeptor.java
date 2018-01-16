package bigdata3.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class InterCeptor implements HandlerInterceptor {
	// 인터셉터 로그인 세션 체커
	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object handler) throws Exception {
		// 세션 객체 생성
		HttpSession session = req.getSession();

		// 세션에 로그인된 이메일이 없다면
		if (session.getAttribute("email") == null) {
			// 실패 페이지 or 로그인 페이지로(접근 제한)
			res.sendRedirect(req.getContextPath() + "/");
			return false;
		} else {
			// 세션 유지 시간
			session.setMaxInactiveInterval(30 * 60);
			// 아니면 그대로 진행
			return true;
		}
	}
}
