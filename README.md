https://chiteste4eva.github.io/ToyotaLexusMotors/
# Toyota Lexus Motors Website

A static GitHub Pages website for a Toyota and Lexus used-car seller. Customers can filter inventory, open detailed car information, and contact the seller directly through WhatsApp, phone, or email.

## Edit Inventory

Open `script.js` and update the `cars` array. Each car supports:

- `brand`, `model`, `year`
- `price`, `mileage`
- `transmission`, `fuel`, `drivetrain`
- `condition`, `location`
- `image`, `summary`

Update the `CONTACT` object in `script.js`, plus the header/contact links in `index.html`, before going live.

## Deploy

The repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`. Push to `main`, then set GitHub Pages to use GitHub Actions if GitHub prompts for a Pages source.
