
import { getLastUrlSegment } from '../helpers/string.helpers';
import { useNavigation } from '@react-navigation/native';
import routes, { AppNavProps } from '../config/routes.config';

export const useCatalogLinkNav = () => {
     const navigation = useNavigation<AppNavProps>();
     return {
          onNavigate(link: string) {
               const slug = getLastUrlSegment(link);
               if (!!slug) {
                    navigation.navigate(routes.customerCatalog, { category_parameter: slug })
               }
          }
     }
}