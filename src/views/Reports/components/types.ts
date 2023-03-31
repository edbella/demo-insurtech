export type User = {
	userId?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
};

export type Project = {
	projectId?: string;
	userIds?: string[];
	rule?: string;
	gatewayIds?: string[];
	structure?: string;
	industry?: string;
	website?: string;
	description?: string;
	image?: string;
	name?: string;
};

export type Gateway = {
	gatewayId?: string;
	userIds?: string[];
	name?: string;
	type?: string;
	apiKey?: string;
	secondaryApiKey?: string;
	description?: string;
};

export type Report = {
	paymentId?: string;
	amount?: number;
	projectId?: string;
	gatewayId?: string;
	userIds?: string[];
	modified?: string;
	created?: string;
	projectName?: string;
	gatewayName?: string;
};
