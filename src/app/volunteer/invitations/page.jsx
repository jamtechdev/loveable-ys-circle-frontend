"use client";
import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Alert,
    Pagination,
} from "@mui/material";
import { volunteerService } from "../../../lib/volunteer/volunteerService";

export default function Invitations() {
    const [invitations, setInvitations] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchInvitations = async (pageNumber = 1) => {
        setLoading(true);
        setError("");

        try {
            const res = await volunteerService.myInvitations(pageNumber, "");
            console.log(res?.data, '================');

            setInvitations(res?.data || []);
            setTotalPages(res?.data?.last_page || 1);
        } catch (err) {
            console.error("Invitations Fetch Error:", err);
            setError("Failed to load invitations. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvitations(page);
    }, [page]);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Invitations
            </Typography>

            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {!loading && !error && invitations?.data?.length === 0 && (
                <Alert severity="info">You have no invitations.</Alert>
            )}

            {!loading &&
                !error &&
                invitations?.data?.map((inv) => (
                    <Card key={inv.id} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6">
                                {inv.support_page?.title}
                            </Typography>

                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Status: <strong>{inv?.status}</strong>
                            </Typography>

                            {inv.support_page?.story && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    {inv.support_page?.story}
                                </Typography>
                            )}

                            {inv.support_page?.special_instructions && (
                                <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
                                    Instructions: {inv.support_page?.special_instructions}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                ))}

            {/* Pagination */}
            {!loading && invitations?.data && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Pagination
                        count={invitations?.total_pages}
                        page={invitations?.current_page}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                    />
                </Box>
            )}
        </Box>
    );
}
