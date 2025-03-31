import { useParams } from "react-router-dom";
import { list } from "../../Data/Lists";
import { listeAbsenceData } from "../../Data/ListeAbsenceData";
import { groups } from "../../Data/Users";
import { ListHeader } from "../../Components/Teacher/ListComponents";
export default function List() {
    const { idGroup, weekId} = useParams();

    
    const group = groups.find(group => group.idGroup === Number(idGroup));
    const weekData = listeAbsenceData.find(w => w.id === Number(weekId));
    console.log(weekData);
    const fromDate = new Date(weekData?.from);
    const toDate = new Date(weekData?.to);
    const fromFormattedDate = fromDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const toFormattedDate = toDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return (
        <div className=" mx-auto px-4 py-6">
            <ListHeader groupLibel={group.libel} studentsCount={list.length} date={`${fromFormattedDate} - ${toFormattedDate}`} />
            
        </div>
    )
}
