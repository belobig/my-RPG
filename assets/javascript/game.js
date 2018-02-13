$(document).ready(function () {

	var luke = {
		name: "luke skywalker",
		hp: 100,
		image: "<img class='charCards' src='assets/images/luke.jpeg' alt='Luke Skywalker'>",
		attackPwr: 5,
		counterAttackPower: 8
	}

	var lukeCard = "<figure class='charCards card' id='Lukie'>" + luke.image + "<figcaption>" + luke.name + "<br>hp: <span id='lukehp'>" + luke.hp + "</span></figcaption></figure>";

	var obi = {
		name: "obi wan kenobi",
		hp: 120,
		image: "<img class='charCards' src='assets/images/obi.jpg' alt='Obi Wan Kenobi'>",
		attackPwr: 8,
		counterAttackPower: 11
	}

	var obiCard = "<figure class='charCards card' id='Obidobi'>" + obi.image + "<figcaption>" + obi.name + "<br>hp: <span id='obihp'>" + obi.hp + "</span></figcaption></figure>";

	var vader = {
		name: "darth vader",
		hp: 150,
		image: "<img class='charCards' src='assets/images/vader.jpg' alt='Darth Vader'>",
		attackPwr: 20,
		counterAttackPower: 23
	}

	var vaderCard = "<figure class='charCards card' id='Vadie'>" + vader.image + "<figcaption>" + vader.name + "<br>hp: <span id='vaderhp'>" + vader.hp + "</span></figcaption></figure>";

	var sidious = {
		name: "darth sidious",
		hp: 180,
		image: "<img class='charCards' src='assets/images/sidious.jpg' alt='Darth Sidious'>",
		attackPwr: 25,
		counterAttackPower: 28
	}

	var sidiousCard = "<figure class='charCards card' id='Siddy'>" + sidious.image + "<figcaption>" + sidious.name + "<br>hp: <span id='sidioushp'>" + sidious.hp + "</span></figcaption></figure>";

	var charChosen = false;
	var enemyChosen = false;
	var attackButton = "<button class='btn btn-danger' id='attackBtn'>attack!</button>";
	var tryAgainButton = "<button class='btn btn-warning' id='tryAgainBtn'>try again</button>";
	var nextEnemyButton = "<button class='btn btn-info' id='nextEnemyBtn'>next enemy</button>";
	var winnerButton = "<button class='btn btn-success' id='winnerBtn'>winner! play again?</button>";
	var attackPower;
	var atkHP;
	var dfndHP;
	var defendPower;
	var atkObjConvert;
	var dfndObjConvert;
	var winsCounter = 0;
	var enemyDefeated = false;

	function play() {

		charChosen = false;
		enemyChosen = false;
		$("#chooseArea").show();
		$("#enemiesArea").show();
		$("#enemiesArea>.card").remove();
		$("#you").html("<h3>you</h3>");
		$("#attack").html("vs.");
		$("#enemy").html("<h3>enemy</h3>");
		$("#battlEnd").html("");
		luke.hp = 100;
		luke.attackPwr = 5;
		obi.hp = 120;
		obi.attackPwr = 8;
		vader.hp = 150;
		vader.attackPwr = 20;
		sidious.hp = 180;
		sidious.attackPwr = 25;
		winsCounter = 0;
		enemyDefeated = false;


		$("#chooseArea").append(lukeCard);
		$("#chooseArea").append(obiCard);
		$("#chooseArea").append(vaderCard);
		$("#chooseArea").append(sidiousCard);


		$("#chooseArea>.card").click(function () {
			console.log(this.id + " was clicked");
			$(this).addClass("chosenChar");
			$(this).remove().appendTo("#you");
			charChosen = true;
			addEnemies();
		});

		//not sure why this piece of garbage isn't working
		// if ($('.card', '#enemy').length == 1) {
		// 	console.log("Got an enemy!");
		// 	enemyChosen = true;
		// }

		function addEnemies() {
			if (charChosen === true) {
				$("#chooseArea>.card").remove().appendTo("#enemiesArea");
				$("#chooseArea").hide();
				if (enemyChosen == false) {
					$("#enemiesArea>.card").click(function () {
						console.log(this.id + " is now your enemy");
						$(this).addClass("chosenEnemy");
						$(this).remove().appendTo("#enemy");
						fight();
					});
				} else {
					$("#enemiesArea>.card").click(function () {
						console.log("You've already chosen an enemy, now fight!") //not working
					});
				}
			}
		}

		function fight() {
			enemyChosen = true;
			//may remove this if I can get it to not allow more than one enemy selected
			$("#enemiesArea").hide();

			$("#attack").html(attackButton);
			$("#attackBtn").click(function () {
				attacker();
				console.log($(".chosenChar").attr('id') + " attacks for " + attackPower);
				$("#attackerMsg").html("<p>" + atkObjConvert.name + " attacks for " + attackPower + " damage</p>");
				atkObjConvert.attackPwr += atkObjConvert.attackPwr;
				defender();
				console.log($(".chosenEnemy").attr('id') + " defends for " + defendPower);
				$("#defenderMsg").html("<p>" + dfndObjConvert.name + " defends for " + defendPower + " damage</p>");
				atkObjConvert.hp -= defendPower;
				console.log($(".chosenChar").attr('id') + " has " + atkObjConvert.hp + " health points");
				atkHP.html(atkObjConvert.hp);
				dfndObjConvert.hp -= attackPower;
				console.log($(".chosenEnemy").attr('id') + " has " + dfndObjConvert.hp + " health points");
				dfndHP.html(dfndObjConvert.hp);
				if (atkObjConvert.hp <= 0 && dfndObjConvert.hp > 0) {
					console.log("You lose!");
					$("#enemy>h3").html("enemy wins!");
					$(".chosenChar").html("<h3>lose!</h3>");
					$("#attack").html("");
					$("#battlEnd").html(tryAgainButton);
					$("#attackerMsg").html("");
					$("#defenderMsg").html("");
					tryAgain();
				} else if (dfndObjConvert.hp <= 0) {
					console.log("You win!");
					$("#you>h3").html("you win!");
					$(".chosenEnemy").html("<h3>loses!</h3>");
					$("#attack").html("");
					winsCounter++;
					enemyDefeated = true;
					if (winsCounter < 3) {
						console.log("There are still enemies to defeat");
						$("#battlEnd").html(nextEnemyButton);
						$("#attackerMsg").html("");
						$("#defenderMsg").html("");
						$("#enemy>.card").removeClass("chosenEnemy");
						nextEnemy();
					} else {
						console.log("All enemies have been defeated");
						$("#battlEnd").html(winnerButton);
						$("#attackerMsg").html("");
						$("#defenderMsg").html("");
						$("#enemy>.card").removeClass("chosenEnemy");
						tryAgain();
					}
				} else if (enemyDefeated = true && atkObjConvert.hp <= 0) {
					console.log("What? Negative HP?"); //not working
				}
			});

		}

		function attacker() {
			if ($(".chosenChar").attr('id') === "Lukie") {
				atkObjConvert = luke;
				attackPower = luke.attackPwr;
				atkHP = $("#lukehp");
			} else if ($(".chosenChar").attr('id') === "Obidobi") {
				atkObjConvert = obi;
				attackPower = obi.attackPwr;
				atkHP = $("#obihp");
			} else if ($(".chosenChar").attr('id') === "Vadie") {
				atkObjConvert = vader;
				attackPower = vader.attackPwr;
				atkHP = $("#vaderhp");
			} else if ($(".chosenChar").attr('id') === "Siddy") {
				atkObjConvert = sidious;
				attackPower = sidious.attackPwr;
				atkHP = $("#sidioushp");
			}
		}

		function defender() {
			if ($(".chosenEnemy").attr('id') === "Lukie") {
				dfndObjConvert = luke;
				defendPower = luke.counterAttackPower;
				dfndHP = $("#lukehp");
			} else if ($(".chosenEnemy").attr('id') === "Obidobi") {
				dfndObjConvert = obi;
				defendPower = obi.counterAttackPower;
				dfndHP = $("#obihp");
			} else if ($(".chosenEnemy").attr('id') === "Vadie") {
				dfndObjConvert = vader;
				defendPower = vader.counterAttackPower;
				dfndHP = $("#vaderhp");
			} else if ($(".chosenEnemy").attr('id') === "Siddy") {
				dfndObjConvert = sidious;
				defendPower = sidious.counterAttackPower;
				dfndHP = $("#sidioushp");
			}
		}

		function nextEnemy() {
			$("#nextEnemyBtn").click(function () {
				console.log("Next Enemy button clicked");
				enemyChosen = false;
				$("#enemiesArea").show();
				$("#battlEnd").html("");
				$("#you>h3").html("<h3>you</h3>");
				$("#enemy").html("<h3>enemy</h3>");
				addEnemies();
			});
		}

	}

	play();

	function tryAgain() {
		$("#tryAgainBtn, #winnerBtn").click(function () {
			console.log("Try again button clicked");
			play();
		});

	}

});