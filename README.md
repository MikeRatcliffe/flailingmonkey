# flailingmonkey

## Installing Jekyll

### Ubuntu

```bash
sudo apt-get install software-properties-common
sudo apt-add-repository -y ppa:rael-gc/rvm
sudo apt-get update
sudo apt-get install rvm
```

### OSX

```bash
brew install gnupg
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
curl -sSL https://get.rvm.io | bash -s stable --ruby
```

### Install Jekyll

```bash
rvm install ruby
rvm --default use ruby
gem update --system
gem install jekyll bundler

bundle install
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
set JEKYLL_ENV=production && bundle exec jekyll build
set JEKYLL_ENV=production && bundle exec jekyll build -V # Verbose Version
```
