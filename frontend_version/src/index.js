const minLength = 3

function processFile() {
  const fileInput = document.getElementById("file-upload")
  const file = fileInput.files[0]
  const reader = new FileReader()

  reader.onload = function (e) {
    const text = e.target.result
    const wordCounts = countWords(text)
    renderWordCloud(wordCounts)
  }

  reader.readAsText(file)
}

function countWords(text) {
  const wordCounts = {}
  const words = text.toLowerCase().split(/\W+/)

  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    const wordLength = word.length
    if (wordLength > minLength && !stopWords.includes(word)) {
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
  d3.select("#wordcloud-svg").selectAll("*").remove()

  const words = Object.keys(wordCounts).map(function (word) {
    return { text: word, size: wordCounts[word] }
  })

  const width = 800
  const height = 400

  d3.layout
    .cloud()
    .size([width, height])
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
    d3.select("#wordcloud-svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
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
