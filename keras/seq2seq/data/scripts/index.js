var lines_dict = {}
var conv_arr = []
var dialogs = []
var dialog_grams = []
var read_c = 0
var final_dialogs = ''

var lineReader = require('readline').createInterface({
  	input: require('fs').createReadStream('data/movie_lines.txt')
})

lineReader.on('line', function (line) {
	var lsp = line.split(' +++$+++ ')
  	lines_dict[lsp[0]] = lsp[4].split('\t').join(' ')
  	// console.log(lsp[4].split('\t').join(' '))
})

lineReader.on('close', function() {
	// console.log('CLOSE1')
	read_c ++
	if (read_c > 1) {
		createDialogs()
	}
})

var lineReader1 = require('readline').createInterface({
  	input: require('fs').createReadStream('data/movie_conversations.txt')
})

lineReader1.on('line', function (line) {
	var lsp = line.split(' +++$+++ ')
	lsp = lsp[3].split('\'').join('\"')
  	lsp = JSON.parse(lsp)
  	conv_arr.push(lsp)
})

lineReader1.on('close', function() {
	// console.log('CLOSE2')
	read_c ++
	if (read_c > 1) {
		createDialogs()
	}
})

function createDialogs() {
	for(var j = 1; j < conv_arr.length; j ++) {
		var list = conv_arr[j]
		if (list.length > 0) {
			var line = []
			for(var i = 0; i < list.length; i ++) {
				line.push(lines_dict[list[i]])
			}
			dialogs.push(line)
			console.log(line.join('\t'))
		}
	}
	// console.log(dialogs)
	// createDialogGrams()
}

function createDialogGrams() {
	for(var j = 0; j < dialogs.length; j ++) {
		var conv_arr = dialogs[j]
		// dialog_grams
		for (var x = 2; x <= conv_arr.length; x ++) {
			var tmp = []
			for (var y = 0; y < x; y ++) {
				tmp.push(conv_arr[y])
			}
			dialog_grams.push(tmp)
		}
	}

	shuffle(dialog_grams)
	// console.log(dialog_grams)
	// createDialogsTxt()
	createStarspaceData()
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function createDialogsTxt() {
	for(var j = 1; j < dialog_grams.length; j ++) {
		var list = dialog_grams[j]
		final_dialogs += list.join(' +++$+++ ') + '\n'
	}
	// console.log(final_dialogs)
}

function createStarspaceData() {
	for(var j = 1; j < dialog_grams.length; j ++) {
		var list = dialog_grams[j]
		final_dialogs += list.join('\t') + '\n'
	}
	// console.log(final_dialogs)
}