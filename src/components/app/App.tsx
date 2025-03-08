import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import { defaultArticleState } from 'src/constants/articleProps';

import { CSSProperties, useState } from 'react';

import styles from './App.module.scss';

export const App = () => {
	const [options, setOptions] = useState({ ...defaultArticleState });

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': options.fontFamilyOption.value,
					'--font-size': options.fontSizeOption.value,
					'--font-color': options.fontColor.value,
					'--container-width': options.contentWidth.value,
					'--bg-color': options.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm options={options} setOptions={setOptions} />
			<Article />
		</main>
	);
};
