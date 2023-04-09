<div align='center'>

# **Tagdir**

</div>

<div align='center'>

### Open-Source CLI to add configurations to projects

</div>

<h4 align='center'>
    <a href="https://www.npmjs.com/package/tagdir">
        <img src="https://img.shields.io/npm/v/tagdir.svg" alt="Tagdir version" />
    </a>
    <a href="https://github.com/Yitzhakpro/Tagdir/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Tagdir is released under the MIT license." />
    </a>
    <a href="https://github.com/Yitzhakpro/Tagdir/issues">
        <img src="https://img.shields.io/github/commit-activity/m/Yitzhakpro/Tagdir" alt="git commit activity" />
    </a>
</h4>

# How Tagdir can help you?

Have you ever started a project and forgotten to add configurations (eslint, prettier, etc...)?
</br>
Have you ever wanted to create a config-less project and later configurations (eslint, prettier, etc...)?

Well, `Tagdir` is the tool for you, with configmaster you can add any configuration to an existing project,
</br>
just use a simple command, answer the prompts and it will do the rest for you (including creating configuration files, ignore files and adding scripts to package.json).

### Configurations you can add:

-   [Husky](https://www.npmjs.com/package/husky)
-   [Eslint](https://www.npmjs.com/package/eslint)
-   [Prettier](https://www.npmjs.com/package/prettier)
-   [License](https://choosealicense.com/)

# Usage

**Notice: You can the --help to view all the options:** `npx tagdir --help`

### To `add` configurations:

```console
$ npx tagdir add prettier, husky, eslint
```

The available configurations are: `eslint`, `husky`, `prettier`, `license`.
**You can specify the configurations in any order!**

**For more help use:** `npx tagdir add --help`
