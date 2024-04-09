### Install dependencies

I'm running this exercise using node v19.9.0

```
npm install
```

### Start the NextJS application

```
npm run dev
```

---

### Additions made

#### Components created

1. spinner
2. submit-button

    - encapsulates the spinner, while
    - performs async actions and returning success/failure

3. veneer
    - it wraps other child components
    - toggles an overlay on top of them, allowing for pointer events to be turned on/off
    - also allows for some stylistic features
4. section-uploader
    - replaces the `<MedicalRecordUpload/>` and `<GuidelinesUpload/>` components
    - utilizes the submit button

#### Content / Copytext

I've abstracted away all the static text content (titles, button labels etc.) in `app/copytext.ts`. While this might seem excessive, it is a good practice to do this as it makes localization a breeze later on.
