let myObj = {
    func1: function(name) {
        console.log(name + " called func1().");
    },

    func2: function(name) {
        console.log(name + " called func2().");
        this.func1(name);
    }
};

xdescribe("Testing binding...", () => {
    it("Should work.", () => {
        myObj.func1("Chris");
    });
    
    it("Should get an error.", () => {
        myObj.func2("Chris");
    });
});
