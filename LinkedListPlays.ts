class Head{
    head: any;
    constructor(){
        this.head=null;
    }
}
class List{
    next: any;
    value: any;
    constructor(){
        this.value=null;
        this.next=null;
    }
}
async function stored(y){
const storage = new Head();
const nodes=new List();
nodes.value = y;
nodes.next=storage.head;
storage.head=nodes;
}
export default stored;


