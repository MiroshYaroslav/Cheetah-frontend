import { useState } from "react";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import styles from "./Contact.module.css";
import SectionHeader from "../../components/SectionHeader/SectionHeader.tsx";

type FormState = {
    fullName: string;
    phone: string;
    email: string;
    proposal: string;
};

export default function Contact() {
    const [form, setForm] = useState<FormState>({
        fullName: "",
        phone: "",
        email: "",
        proposal: "",
    });

    function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log("Contact form:", form);
        alert("Sent! (demo)");
        setForm({ fullName: "", phone: "", email: "", proposal: "" });
    }

    return (
        <section id="contact" className={styles.section}>
            <Container>
                <div className={styles.wrapper}>
                    <SectionHeader title="Get in Touch" align="left" />

                    <form className={styles.form} onSubmit={onSubmit}>
                        <label className={styles.labelWrap}>
                            <span className={styles.labelText}>Full name</span>
                            <input
                                className={styles.input}
                                value={form.fullName}
                                onChange={(e) => onChange("fullName", e.target.value)}
                                placeholder="Full name"
                            />
                        </label>

                        <label className={styles.labelWrap}>
                            <span className={styles.labelText}>Phone</span>
                            <input
                                className={styles.input}
                                value={form.phone}
                                onChange={(e) => onChange("phone", e.target.value)}
                                placeholder="Phone"
                            />
                        </label>

                        <label className={styles.labelWrap}>
                            <span className={styles.labelText}>Email</span>
                            <input
                                className={styles.input}
                                value={form.email}
                                onChange={(e) => onChange("email", e.target.value)}
                                placeholder="Email"
                                type="email"
                            />
                        </label>

                        <label className={styles.labelWrap}>
                            <span className={styles.labelText}>Proposal</span>
                            <input
                                className={styles.input}
                                value={form.proposal}
                                onChange={(e) => onChange("proposal", e.target.value)}
                                placeholder="Proposal"
                            />
                        </label>

                        <Button type="submit" variant="primary" className={styles.sendBtn}>
                            Send
                        </Button>
                    </form>
                </div>
            </Container>
        </section>
    );
}