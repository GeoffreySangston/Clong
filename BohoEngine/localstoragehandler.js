window.fakeStorage = {
	_data: {},

	setItem: function (id, val) {
		return this._data[id] = String(val);
	},

	getItem: function (id) {
		return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
	},

	removeItem: function (id) {
		return delete this._data[id];
	},

	clear: function () {
		return this._data = {};
	}
};
	
function LocalStorageHandler() {

	this.storage = this.createStorage();
	
}

LocalStorageHandler.prototype.createStorage = function(){
	var supported = this.localStorageSupported();
	return supported ? window.localStorage : window.fakeStorage;
}

LocalStorageHandler.prototype.localStorageSupported = function () {
	var testKey = "test";
	var storage = window.localStorage;

	try {
		storage.setItem(testKey, "1");
		storage.removeItem(testKey);
		return true;
	} catch (error) {
		return false;
	}
};




