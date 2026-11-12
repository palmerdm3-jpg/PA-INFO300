var readLineSync = require("readline-sync")
console.log("Hello. This is a Subnet Host Checker or a Compute environment selector.")
var userInput = "Null"
console.log("Please input a valid program type. ")

while (userInput == "Null") {
	var userInput = readLineSync.question("Would you like to use SHC, CES, or QUIT? ")
	if (userInput == "CES"){
		console.log(userInput + " selected.")
	}
	else if (userInput == "SHC"){
		console.log(userInput + " selected.")	
	}
	else if (userInput == "QUIT"){
		console.log("Closing program.")
	}
	else if (userInput != "Null"){
	console.log(userInput + " is an invalid input.")
	var userInput = "Null"
	}

	if (userInput == "SHC"){
		console.log("Subnet Host Checker initiated!")

		var vpcCidr = readLineSync.question("What is the VPC CIDR? ")
		while (vpcCidr < 16 || vpcCidr > 30 ){
			console.log(vpcCidr +" is incorrect. The value should be between 16 and 30.")
			var vpcCidr = readLineSync.question("What is the VPC CIDR? ")
		}

		var subnetCidr = readLineSync.question("What is the subnet CIDR? ")
		while (subnetCidr < 16 || subnetCidr > 30){
			console.log(subnetCidr +" is incorrect. The value should be between 16 and 30.")
			var subnetCidr = readLineSync.question("What is the subnet CIDR? ")
		}
		var deviceCount = readLineSync.question("What is the number of devices required? " )
		while (deviceCount <= 0){
			console.log(deviceCount +" is incorrect. The value should be a positive integer.")
			var deviceCount = readLineSync.question("What is the number of devices required? ")
		}

		console.log("vpc CIDR is:" + vpcCidr)
		console.log("subnet CIDR is:" + subnetCidr)
		console.log("device count is:" + deviceCount)

		if (vpcCidr < subnetCidr){
			console.log("Subnet CIDR and VPC CIDR consistent.")
			var remainder = (32 - subnetCidr)
			var hosts = (2**remainder -2)
			console.log("Number of hosts: " + hosts)
			var numofIPs = (2**(32-subnetCidr))
			console.log("Number of IP addresses: " + numofIPs)
			if (deviceCount < numofIPs){
			console.log("Hosts can serve the device amount.")
			}
			else if (deviceCount > numofIPs){
			console.log("Warning! Hosts cannot support this amount of devices.")
			}

			if (numofIPs > deviceCount){
			console.log("AWS reserves 5 IP addresses, so " + ((numofIPs - deviceCount) - 5) + " are unused.")
			}
		}
		else if (numofIPs < deviceCount){
			console.log("AWS reserves 5 IP addresses, so " + ((deviceCount - numofIPs) + 5) + " are needed.")
		}
		
		else if (vpcCidr <= subnetCidr){
			console.log("Subnet CIDR and VPC CIDR error. Values inconsistent.")
		}

		var userInput = "Null"
	}

	if (userInput == "CES"){
		console.log("Compute Environment Selector initiated!")

		var appName = readLineSync.question("What is the application name? ")
		var monthlyUsers = readLineSync.question("How many monthly users? ")
		while (monthlyUsers <= 0){
			console.log(monthlyUsers +" is incorrect. The value should be a positive integer.")
			var monthlyUsers = readLineSync.question("How many monthly users? ")
		}
		var monthlyBudget = readLineSync.question("What is the monthly budget? ")
		while (monthlyBudget <= 0){
			console.log(monthlyBudget +" is incorrect. The value should be a positive integer.")
			var monthlyBudget = readLineSync.question("What is the monthly budget? ")
		}
		var availability = readLineSync.question("Do you have high availability? yes or no. ")
		while (availability != "yes" && availability != "no"){
			console.log(availability + " is invalid. Please input yes or no.")
			var availability = readLineSync.question("Do you have high availability? yes or no. ")
		}

		console.log("App name:" + appName)
		console.log("Monthly users:" + monthlyUsers)
		console.log("Monthly budget:" + monthlyBudget)
		console.log("High availability? " + availability)

		if (monthlyUsers < 1000 && availability == "no"){
			console.log("with "+ monthlyUsers + " monthly users and low availability, you should use a single EC2 instance.")
		}
		else if (monthlyUsers >= 1000 && monthlyUsers <= 10000){
			console.log("with " + monthlyUsers + " monthly users, you should use EC2 and a load balancer.")
			if (monthlyBudget < 1000){
			console.log("Warning! This architecture requires more than one EC2 instance, which may cause issues with the low budget.")
			}
		}
		else if (monthlyUsers >= 10000 || availability == "yes"){
			console.log("You should use EC2 with a load balancer and auto scaling.")
			if (monthlyBudget < 1000){
			console.log("Warning! This architecture requires more than one EC2 instance, which may cause issues with the low budget.")
			}
			else if (monthlyBudget > 1000 && monthlyBudget < 3000){
				console.log("Warning! This architecture requires auto scaling, which may cause issues with the current budget.")
			}
		}
		var userInput = "Null"
	}
}
	//allow multiple runs
	//use git and github
	//add a readme to the github repository
	//add mcgarrym@vcu.edu as a collaborator to GitHub repository