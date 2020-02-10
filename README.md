# flailingmonkey

## Installing Jekyll

```bash
brew install ruby ruby-build
gem install jekyll bundler
sudo gem update --system
```

If you receive errors about uninstalled packages run this changing the package name as appropriate:

```bash
sudo gem install -n /usr/local/bin bundler:2.1.2
```

## Develop

```bash
bundle exec jekyll serve --trace
```

## Deploy

```bash
bundle exec jekyll build
bundle exec jekyll build -V # Verbose Version
```
