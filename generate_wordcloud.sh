#!/bin/bash

for f in ./data/*.txt; do
    echo $f processing...
    file_name_without_ext=$(basename $f .txt)
    wordcloud_cli --width 500 --height 500 --text $f --imagefile ./dst/${file_name_without_ext}.png
done

echo all processing end!
