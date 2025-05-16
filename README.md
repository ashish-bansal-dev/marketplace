# Marketplace Monorepo

## Cloning the Repository

To clone this repository along with all its submodules, use the following command:

```bash
git clone --recurse-submodules https://github.com/ashish-bansal-dev/marketplace
```

If you have already cloned the repository without submodules, you can initialize and fetch them with:

```bash
git submodule update --init --recursive
```

## Switching to the Main Branch

After cloning, switch to the `main` branch to start future development:

```bash
git checkout main
```

## Pulling Changes (Main Repo and Submodules)

To pull the latest changes for the main repository and all submodules, use:

```bash
git pull --recurse-submodules
```

To update submodules to the latest commit on their respective branches, run:

```bash
git submodule update --remote --merge
```

This will fetch and merge the latest changes from the submodules' tracked branches.

## Summary

- Clone with submodules: `git clone --recurse-submodules <repository_url>`
- Initialize submodules (if already cloned): `git submodule update --init --recursive`
- Switch to main branch: `git checkout main`
