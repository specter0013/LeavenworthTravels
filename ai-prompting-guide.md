# AI Prompting Guide
### How to work with an AI coding agent

---

## The Core Mental Model

Think of an AI agent as a **very fast, very literal junior developer** who:
- Does exactly what you ask — no more, no less
- Has no memory between sessions unless you give it context
- Can't tell the difference between a good idea and a bad one
- Makes mistakes and confidently moves on

**Your job is the senior developer.** You plan, you specify, you review, you correct. The AI writes; you decide if it's right.

---

## The Planning Prompt (Start Here Every Time)

Before asking an AI to write any code, give it context. Use this template:

```
I'm building a marketing website for [describe what it is].

The audience is [who will visit].
The goal of the site is [what you want visitors to do].
The tone should be [professional / friendly / bold / minimal / etc.].

The site will have these pages: [list them]
The main sections on the homepage are: [list them]

I'm using plain HTML, CSS, and JavaScript — no frameworks.

Let's start with [specific first thing].
```

**Example:**
```
I'm building a marketing website for a local dog grooming business called 
"Paws & Polish" in Grants Pass, Oregon.

The audience is dog owners in Southern Oregon looking for grooming services.
The goal is to get them to book an appointment by calling or filling out a form.
The tone should be warm, friendly, and trustworthy.

The site will have these pages: Home, Services, About, Contact
The main sections on the homepage are: Hero (tagline + CTA), Services overview, 
Testimonials, Contact form

I'm using plain HTML, CSS, and JavaScript — no frameworks.

Let's start with the HTML structure for the homepage.
```

---

## Types of Requests

### "Build this for me"
Ask for one thing at a time. Break big requests into steps.

✅ **Good:** "Write the HTML structure for a navigation bar with links to Home, Services, About, and Contact. Use semantic HTML."

❌ **Too broad:** "Build my whole website."

---

### "Explain this to me"
When you don't understand something the AI wrote, ask it to explain.

```
Explain what flexbox gap does in this code. Use plain English.
```

```
Why did you use position: relative on the parent and position: absolute 
on the child? Walk me through it.
```

---

### "Fix this"
Paste the broken code. Describe what's wrong. Show what you expected.

```
This CSS isn't working. The nav items should be in a row but they're stacking 
vertically. Here's my CSS:

[paste your code]

What's wrong?
```

---

### "Review this"
Ask the AI to QA its own work — or your work.

```
Review this HTML for:
- Accessibility issues (missing alt text, labels, etc.)
- Missing meta tags
- Any structural problems

[paste your code]
```

---

## The QA Loop

After every AI-generated piece of code, run this mental checklist:

1. **Read it** — Do you understand what it does? If not, ask for an explanation.
2. **Open it in a browser** — Does it look right? Does it work?
3. **Check the console** — Open DevTools (`F12`) and look for red errors.
4. **Resize the window** — Does it still look good at phone width?
5. **Try to break it** — Click things, submit the form empty, use a weird input.

Only move on when it passes all five.

---

## Giving Corrections

Be specific. The AI doesn't know what "better" means.

❌ **Vague:** "Make the hero look better."

✅ **Specific:** "Increase the hero headline to 3rem. Change the background to a dark navy (#0f172a) with white text. Add 80px of top/bottom padding."

---

## Common Mistakes to Catch

The AI will sometimes:

- **Use inline styles** instead of CSS classes — ask it to move styles to your stylesheet
- **Add `<style>` blocks** in the HTML — same thing, move to CSS
- **Use absolute positioning** when flexbox would work better
- **Forget `alt` text** on images
- **Create new files** when you asked it to edit an existing one
- **Change things you didn't ask it to change** — always diff the output

---

## Useful Correction Phrases

```
"Good — but don't change anything I didn't ask you to change."

"Move those inline styles to my styles.css file."

"This works but I don't understand it. Explain it before we continue."

"Undo the last change and try a different approach."

"This breaks on mobile. Fix the responsive behavior without 
changing the desktop layout."
```

---

## When to Stop Asking AI

The AI is a tool, not a crutch. You should be able to:
- Read and explain any code it writes
- Spot when something looks wrong even if you can't fix it instantly
- Write basic HTML structure and CSS rules without AI help

If you can't do those things, go back to fundamentals before relying on AI output.

---

## Prompting for SEO and AEO

When asking AI to write copy for your site, include this context:

```
Write the hero headline and subheadline for [business name].
- It should include the primary keyword "[keyword]"
- The tone should be [tone]
- Keep the headline under 8 words
- The subheadline should be 1–2 sentences explaining the value proposition
- Write it for humans first, search engines second
```

For AEO (AI-powered search):
```
Write the "About" section for [business name] in a factual, 
third-person style that answers: who they are, what they do, 
where they're located, and what makes them different. 
Use clear headings. Write it so an AI could quote it accurately.
```

---

## Session Starter Checklist

Every time you open a new AI session for your project:

- [ ] Paste your planning prompt (or a summary of your project)
- [ ] Attach or paste the file you're currently working on
- [ ] Describe exactly what you want to do in this session
- [ ] State any constraints ("don't use frameworks", "keep the existing nav")
