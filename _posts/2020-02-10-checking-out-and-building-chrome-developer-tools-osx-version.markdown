---
title: Checking Out and Building Chrome Developer Tools (OSX Version)
date: "2020-02-09 10:00:00"
tags:
  - Chromium, Chrome DevTools, Edge DevTools
current: checkingoutandbuildingchromedevelopertoolsosxversion
featuredimage: chrome-devtools.png
---

Afer almost 9 years at Mozilla I have suddenly found myself in a place where I have plenty of time to experiment.

One thing that I have wanted to do for a while is play around with the Chrome DevTools codebase and start contributing.

I thought that this would be easy because there is a **lot** of documentation but unfortunately a lot of it is outdated. As somebody new to the codebase this is quite an issue because it is difficult to know which instructions you should use and which you can't.

I suppose that by writing this I am adding to this problem but at least this article includes a creation date so that you know how recent these instructions are.

There are a few methods that you can use. I have chosen to use a method where you can integrate a standalone checkout of the DevTools Frontend into a full Chromium checkout. The advantage of this approach is that you can be sure you have the latest version of DevTools and if you are planning on contributing you need to be working with the latest source.

These steps are intentionally brief in order to get you up and running as quickly as possible.

## Install depot_tools and add it to your PATH

I have a folder just for commonly used scripts so I can keep them all in the same place. For me that folder is `~/.scripts` so I will use this path in my examples. Of course, you should change this path as appropriate.

```bash
cd ~/.scripts
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
```

Add the following to your `~/.zshrc` (or wherever your path is configured):

```bash
export PATH="$PATH:~/.scripts/depot_tools"
```

You can read more about depot_tools [here](https://chromium.googlesource.com/chromium/tools/depot_tools.git).

## Install ccache

ccache is a compiler cache. It speeds up recompilation by caching previous compilations and detecting when the same compilation is being done again.

```bash
brew install --HEAD ccache
```

Check whether ccache is in you path by typing `which ccache`;

If no path is displayed then the following to your .zshrc (or wherever your path is configured):

```bash
export PATH="$PATH:/usr/local/bin"
```

## Ensure that unicode filenames aren't mangled by HFS

```bash
git config --global core.precomposeUnicode true
```

When `core.precomposeUnicode=true`, Git reverts the unicode decomposition of filenames done by Mac OS. This is useful when sharing a repository between Mac OS and Linux or Windows.

## Fetch DevTools Source

```bash
cd ~/Desktop
mkdir chrome-devtools && cd chrome-devtools
fetch devtools-frontend
```

## Prepare to build DevTools

You only need to do this once... don't do it every time you build!

```bash
cd ~/Desktop/chrome-devtools/devtools-frontend
gn gen out/Default --args='cc_wrapper = "ccache" is_debug = true symbol_level = 2'
```

## Build DevTools

```bash
cd ~/Desktop/chrome-devtools/devtools-frontend
autoninja -C out/Default
```

## Fetch Chromium Source

```bash
cd ~/Desktop
mkdir chromium && cd chromium
fetch chromium
```

## Remove the built-in DevTools

We need to remove the DevTools that come with a chromium checkout because we need to use the most up-to-date version, which we have checked out under `devtools-frontend`.

```bash
cd ~/Desktop/chromium
```

Edit `.gclient` and add this to the `custom_deps` section:

```bash
"src/third_party/devtools-frontend/src": None,
```

Then run the following to remove the built-in DevTools files:

```bash
cd ~/Desktop/chromium/src
gclient sync -D
```

## Symlink your DevTools Repository so it will be built with Chromium

```bash
cd ~/Desktop
ln -s devtools/devtools-frontend chromium/src/third_party/devtools-frontend/src
```

## Prepare to build Chromium

```bash
cd ~/Desktop/chromium/src
gn gen out/Default --args='cc_wrapper = "ccache" is_debug = true is_component_build = true symbol_level = 2'
```

## Build Chromium

```bash
cd ~/Desktop/chromium/src
autoninja -C out/Default chrome
```

## Run Chromium

```bash
~/Desktop/chromium/src/out/Default/Chromium.app/Contents/MacOS/Chromium
```

## This is a lot to remember, is there another way?

Yes, this is a lot to remember and I am sure it will change over time. Here are a couple of aliases called `cu` and `cdu` that you can add to your `~/.zshrc` to make it easier to run these tasks.

After adding the aliases run `source ~/.zshrc` in your shell to apply the changes.

Please make sure that the paths match those on your computer and use `cu -h` or `cdu -h` for help:

```bash
function cu() {
  local current=$(pwd)
  cd "$HOME/Desktop/chromium/src"

  if [ $# -eq 0 ]; then
    echo usage: cu \[-c -g -b -h]
  fi

  while [ "$1" != "" ]; do
    case $1 in
      -c | --clobber)
        echo Clobbering...
        rm -rf out/Default
        ;;
      -g | --gen )
        echo Generating out/Default...
        gn gen out/Default --args='cc_wrapper = "ccache" is_debug = true is_component_build = true symbol_level = 2'
        ;;
      -u | --update )
        echo Updating third_party repos and running pre-compile hooks...
        gclient sync
        ;;
      -b | --build )
        echo Building Chromium with autoninja...
        autoninja -C out/Default chrome
        ;;
      -h | --help )
        cu-help
        ;;
      * )
        cu-help
    esac
    shift
  done

  cd "$current"
}

function cdu() {
  local current=$(pwd)
  cd "$HOME/Desktop/chromium/src/third_party/devtools-frontend/src"

  if [ $# -eq 0 ]; then
    echo usage: cdu \[-c -g -b -h]
  fi

  while [ "$1" != "" ]; do
    case $1 in
      -c | --clobber)
        echo Clobbering...
        rm -rf out/Default
        ;;
      -g | --gen )
        echo Generating out/Default...
        gn gen out/Default --args='cc_wrapper = "ccache" is_debug = true symbol_level = 2'
        ;;
      -u | --update )
        echo Updating third_party repos and running pre-compile hooks...
        gclient sync
        ;;
      -b | --build )
        echo Building Chrome DevTools Frontend with autoninja...
        autoninja -C out/Default
        ;;
      -h | --help )
        cdu-help
        ;;
      * )
        cdu-help
    esac
    shift
  done

  cd "$current"
}

function cu-help() {
  printf "usage: cu [arguments]\n\n"
  printf "Tools to help manage the chromium codebase.\n\n"
  printf "-c, --clobber\t%s\n" 'Erase out/Default]'
  printf "-g, --gen\t%s\n"     'Generate out/Default.'
  printf "-u, --update\t%s\n"  'Update third_party repos and run pre-compile hooks.'
  printf "-b, --build\t%s\n"   'Build Chromium with autoninja.'
  printf "-h, --help\t%s\n"    'Show this help message.'
}

function cdu-help() {
  printf "usage: cdu [arguments]\n\n"
  printf "Tools to help manage the chrome devtools frontend codebase.\n\n"
  printf "-c, --clobber\t%s\n" 'Erase out/Default]'
  printf "-g, --gen\t%s\n"     'Generate out/Default.'
  printf "-u, --update\t%s\n"  'Update third_party repos and run pre-compile hooks.'
  printf "-b, --build\t%s\n"   'Build Chrome DevTools Frontend with autoninja.'
  printf "-h, --help\t%s\n"    'Show this help message.'
}
```

## But there is a mistake or something is missing from this article

I am sure this article is far from perfect so feel free to comment and I will take your advice and make it better... I have just got everything building so I am sure I am missing something.

## But I didn't explain how to contribute

That is explained clearly along with some of the information in this article on the [depot_tools manual page](https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html). I will add an article explaining how to contribute when I have time.

## Useful Links

Again, if you know of anything up-to-date that you think I should include then please let me know. Here is my list so far:

1. [Checking out and building Chromium for Mac](https://chromium.googlesource.com/chromium/src/+/master/docs/mac_build_instructions.md).
1. [Chrome DevTools Protocol Viewer (official)](https://chromedevtools.github.io/devtools-protocol/).
1. [Chrome DevTools Protocol Viewer (unofficial)](https://vanilla.aslushnikov.com/).
1. [Chromium bug list](https://bugs.chromium.org/p/chromium/issues/list?mode=grid).
1. [Chromium Code Reviews](https://codereview.chromium.org/).
1. [Chromium Code Search](https://source.chromium.org/).
1. [Chromium devtools-frontend Main Ci Console](https://ci.chromium.org/p/devtools-frontend/g/main/console).
1. [Chromium Web Development Style Guide](https://chromium.googlesource.com/chromium/src/+/master/styleguide/web/web.md).
1. [Chromium's Main Ci Console](https://ci.chromium.org/p/chromium/g/main/console).
1. [Contributing to Chrome DevTools Protocol](https://docs.google.com/document/d/1c-COD2kaK__5iMM5SEx-PzNA7HFmgttcYfOHHX0HaOM/edit).
1. [Contributing to Chrome DevTools](https://docs.google.com/document/d/1WNF-KqRSzPLUUfZqQG5AFeU_Ll8TfWYcJasa_XGf7ro/edit#heading=h.xz439gqj1lwr).
1. [Contributing to Chromium: an illustrated guide](https://meowni.ca/posts/chromium-101/).
1. [Debugging Chromium on macOS](https://dev.chromium.org/developers/how-tos/debugging-on-os-x).
1. [depot_tools_tutorial Manual Page](https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html): This has a lot of information about how to get the source contribute to the Chromium codebase.
1. [devtools-frontend GitHub repository (a couple of days behind their Google repository)](https://github.com/ChromeDevTools/devtools-frontend).
1. [devtools-frontend Google repository](https://chromium.googlesource.com/devtools/devtools-frontend).
1. [GN Quick Start guide](https://gn.googlesource.com/gn/+/master/docs/quick_start.md).
1. [The Chromium Projects How-Tos](https://dev.chromium.org/developers/how-tos).
1. [The Microsoft Edge Team Blog](https://blogs.windows.com/msedgedev/).
1. [Using CCache on Mac](https://chromium.googlesource.com/chromium/src/+/master/docs/ccache_mac.md).
1. [VSCode Dev - Use VSCode to hack on Chromium](https://chromium.googlesource.com/chromium/src/+/master/docs/vscode.md#Setup-For-Chromium).
