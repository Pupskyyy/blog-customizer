import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';

import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	options: ArticleStateType;
	setOptions: (newOptions: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	options,
	setOptions,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [localOptions, setLocalOptions] = useState({ ...options });

	const formRef = useRef<HTMLBaseElement>(null);

	const toggleOpen = () => setIsOpen((prev) => !prev);

	useEffect(() => {
		if (!isOpen) return;
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	const handleOptionChange =
		(key: keyof ArticleStateType) => (selected: OptionType) => {
			setLocalOptions((prev) => ({ ...prev, [key]: selected }));
		};

	const handleReset = () => {
		setLocalOptions(defaultArticleState);
		setOptions({ ...defaultArticleState });
	};

	const handleApply = (event: React.FormEvent) => {
		event.preventDefault();
		setOptions(localOptions);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleApply}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={localOptions.fontFamilyOption}
						onChange={handleOptionChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={localOptions.fontSizeOption}
						onChange={handleOptionChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={localOptions.fontColor}
						onChange={handleOptionChange('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={localOptions.backgroundColor}
						onChange={handleOptionChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={localOptions.contentWidth}
						onChange={handleOptionChange('contentWidth')}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
