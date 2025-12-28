#!/usr/bin/env bash

wp i18n make-pot . languages/acfff.pot \
  --include="src,acf-frontend-forms.php" \
  --slug="acfff" \
  --headers='{"Report-Msgid-Bugs-To":"https://github.com/hirasso/acf-frontend-forms/","POT-Creation-Date":""}'