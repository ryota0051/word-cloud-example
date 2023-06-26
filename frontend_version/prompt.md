本ソースコードは chatGPT を用いて作成したので、プロンプトを下記に示す。

第 1 プロンプト

```
wordcloudをjavascriptで作成したい。要件は、下記の通り

- テキストは英語
- テキストをサーバにアップロードして語数をカウントして、ブラウザ上でwordcloudを描画する(可能であればフロントエンドのみで完結したい。)。
```

第 2 プロンプト

```
aやtheなどのストップワードを除去するようにしたい。
pythonのWordCloudライブラリで使用されているストップワード除去のようなものをイメージしている。
```

第 3 プロンプト

```
新しいファイルをアップロードしたときに前のwordcloudが残っているのでこちらを削除するようにしたい。
```

第 4 プロンプト

```
wordcloudが消えないです。
- html

<!DOCTYPE html>
<html>
  <head>
    <title>WordCloud</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.2.3/d3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3-cloud/1.2.5/d3.layout.cloud.min.js"></script>
    <style>
      #wordcloud {
        width: 800px;
        height: 400px;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <div id="wordcloud">
      <svg id="wordcloud-svg"></svg>
    </div>
    <input type="file" id="file-upload" />
    <button onclick="processFile()">Upload</button>
    <script src="stopwords.js"></script>
    <script src="index.js"></script>
  </body>
</html>

- javascript

function processFile() {
  var fileInput = document.getElementById("file-upload")
  var file = fileInput.files[0]
  var reader = new FileReader()

  reader.onload = function (e) {
    var text = e.target.result
    var wordCounts = countWords(text)
    renderWordCloud(wordCounts)
  }

  reader.readAsText(file)
}

function countWords(text) {
  var wordCounts = {}
  var words = text.toLowerCase().split(/\W+/)

  for (var i = 0; i < words.length; i++) {
    var word = words[i]
    if (word !== "" && !stopWords.includes(word)) {
      if (wordCounts[word] === undefined) {
        wordCounts[word] = 1
      } else {
        wordCounts[word]++
      }
    }
  }

  return wordCounts
}

function renderWordCloud(wordCounts) {
  // 前のWordCloudを削除する
  d3.select("#wordcloud-svg").selectAll("*").remove()
  var words = Object.keys(wordCounts).map(function (word) {
    return { text: word, size: wordCounts[word] }
  })

  d3.layout
    .cloud()
    .size([800, 400])
    .words(words)
    .padding(5)
    .rotate(function () {
      return ~~(Math.random() * 2) * 90
    })
    .font("Impact")
    .fontSize(function (d) {
      return d.size * 10
    })
    .on("end", draw)
    .start()

  function draw(words) {
    d3.select("#wordcloud")
      .append("svg")
      .attr("width", 800)
      .attr("height", 400)
      .append("g")
      .attr("transform", "translate(400,200)")
      .selectAll("text")
      .data(words)
      .enter()
      .append("text")
      .style("font-size", function (d) {
        return d.size + "px"
      })
      .style("font-family", "Impact")
      .style("fill", function (_, i) {
        return d3.schemeCategory10[i % 10]
      })
      .attr("text-anchor", "middle")
      .attr("transform", function (d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"
      })
      .text(function (d) {
        return d.text
      })
  }
}

です。

```

第 5 プロンプト

```
前のwordcloudは削除されましたが、wordcloudの一部しか表示されなくなりました。
```

これで概ね完成
