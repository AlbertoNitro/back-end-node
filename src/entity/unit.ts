
export class UnitEntity {
    private id: Number;
    private name: String;
    constructor(name: String) {
        this.$name = name;
    }
    /**
     * Getter $id
     * @return {Number}
     */
    public get $id(): Number {
        return this.id;
    }
    /**
     * Setter $id
     * @param {Number} value
     */
    public set $id(value: Number) {
        this.id = value;
    }
    /**
     * Getter $name
     * @return {String}
     */
    public get $name(): String {
        return this.name;
    }

    /**
     * Setter $name
     * @param {String} value
     */
    public set $name(value: String) {
        this.name = value;
    }
    public toJson() {
        return "{ name: \"" + this.$name + "\" }";
    }
}