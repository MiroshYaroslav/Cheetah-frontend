import { useState } from "react";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import styles from "./Contact.module.css";

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
        // тут потім зробиш API/telegram/email
        console.log("Contact form:", form);
        alert("Sent! (demo)");
        setForm({ fullName: "", phone: "", email: "", proposal: "" });
    }

    return (
        <section id="contact" className={`section ${styles.section}`}>
            <Container>
                <h2 className={styles.title}>GET IN TOUCH</h2>

                <div className={styles.grid}>
                    <form className={styles.form} onSubmit={onSubmit}>
                        <label className={styles.label}>
                            Full name
                            <input
                                className={styles.input}
                                value={form.fullName}
                                onChange={(e) => onChange("fullName", e.target.value)}
                                placeholder="Full name"
                            />
                        </label>

                        <label className={styles.label}>
                            Phone
                            <input
                                className={styles.input}
                                value={form.phone}
                                onChange={(e) => onChange("phone", e.target.value)}
                                placeholder="Phone"
                            />
                        </label>

                        <label className={styles.label}>
                            Email
                            <input
                                className={styles.input}
                                value={form.email}
                                onChange={(e) => onChange("email", e.target.value)}
                                placeholder="Email"
                                type="email"
                            />
                        </label>

                        <label className={styles.label}>
                            Proposal
                            <textarea
                                className={styles.textarea}
                                value={form.proposal}
                                onChange={(e) => onChange("proposal", e.target.value)}
                                placeholder="Proposal"
                                rows={4}
                            />
                        </label>

                        <Button type="submit" variant="primary" className={styles.send}>
                            Send
                        </Button>
                    </form>

                    <div className={styles.imageWrap}>
                        <img src="/" alt="Contact" loading="lazy" />
                    </div>
                </div>
            </Container>
        </section>
    );
}