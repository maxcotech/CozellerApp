import CText from "../../../../../components/CText";
import Money from "../../../../../components/Money";
import SafeScaffold from "../../../../../components/SafeScaffold";


export default function Products(){
    return (
        <SafeScaffold>
            <CText variant="heading">Products <Money>390</Money></CText>
        </SafeScaffold>
    )
}