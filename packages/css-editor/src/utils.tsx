import parseInlineStyle from 'style-to-object';
import _mapKeys from 'lodash/mapKeys';
import _camelCase from 'lodash/camelCase';

/**
 * parse style string to react use style object
 * @param styleStr
 */
export function parseStyleStringToReactStyle(
  styleStr: string
): React.CSSProperties {
  try {
    const obj = parseInlineStyle(styleStr);
    const reactStyleObj = _mapKeys(obj, (val, key) => _camelCase(key));
    return reactStyleObj;
  } catch (e) {
    console.error('parse style error', e);
    return {};
  }
}
