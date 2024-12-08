export default function Rating({count, rate}) {
return <div>
    <span className="badge badge-pill bg-primary">{rate} / 5 <br />({count} Reviews )</span> 
</div>
    
    

}
