osascript -e "
      tell application \"iTerm2\"
        set newWindow to (create window with default profile)
        tell current session of newWindow
            write text \"cd / \"
        end tell
      end tell
    "

osascript -e "
      tell application \"Terminal\"
        activate
        tell application \"System Events\" to keystroke \"n\" using command down
        repeat while contents of selected tab of window 1 starts with linefeed
          delay 0.01
        end repeat
        do script \"cd / \" in window 1
      end tell
    "
