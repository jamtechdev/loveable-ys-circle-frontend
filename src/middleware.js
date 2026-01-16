import { NextResponse } from "next/server";

const dashboards = {
    coordinator: "/coordinator/dashboard",
    volunteer: "/volunteer/dashboard",
    recipient: "/recipient/dashboard",
};

export function middleware(req) {
    const url = req.nextUrl;
    const path = url.pathname;

    const token = req.cookies.get("token")?.value;
    const userRaw = req.cookies.get("user")?.value;

    let roles = [];

    if (userRaw) {
        try {
            const user = JSON.parse(userRaw);
            roles = user.roles?.map((r) => r.name) || [];
        } catch (e) {
            console.error("User cookie parse error", e);
        }
    }

    // -------- NOT LOGGED IN --------
    if (!token) {
        if (path.startsWith("/coordinator") ||
            path.startsWith("/volunteer") ||
            path.startsWith("/recipient")) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        return NextResponse.next();
    }

    // -------- LOGGED IN --------
    if (path === "/login" || path === "/register") {
        const role = roles[0];
        if (dashboards[role]) {
            return NextResponse.redirect(new URL(dashboards[role], req.url));
        }
        return NextResponse.redirect(new URL("/", req.url));
    }

    // -------- ROLE PROTECTION --------
    if (path.startsWith("/coordinator") && !roles.includes("coordinator")) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    if (path.startsWith("/volunteer") && !roles.includes("volunteer")) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    if (path.startsWith("/recipient") && !roles.includes("recipient")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/coordinator/:path*",
        "/volunteer/:path*",
        "/recipient/:path*",
    ],
};
