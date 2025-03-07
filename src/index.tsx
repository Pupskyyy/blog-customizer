import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [options, setOptions] = useState({ ...defaultArticleState });
	const handleApply = (newOptions: typeof defaultArticleState) => {
		setOptions(newOptions);
	};
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': options.fontFamilyOption.value,
					'--font-size': options.fontSizeOption.value,
					'--font-color': options.fontColor.value,
					'--container-width': options.contentWidth.value,
					'--bg-color': options.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm options={options} onApply={handleApply} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
