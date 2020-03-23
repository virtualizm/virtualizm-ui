pkg_name = virtualizm-ui

lintian_flag := $(if $(lintian),--lintian,--no-lintian)
debian_host_release != lsb_release -sc

app_dir := /opt/virtualizm-ui
app_files := build

export DEBFULLNAME ?= Virtualizm development team
export DEBEMAIL ?= team@virtualizm.org


#Logging functions
define info
        echo -e '\n\e[33m> msg \e[39m\n'
endef

define err
        echo -e '\n\e[31m> msg \e[39m\n'
endef

all:
	@echo "make all"

.PHONY: install
install: $(app_files)
	$(info:msg=install app files)
	@mkdir -p $(DESTDIR)$(app_dir)
	tar -c --no-auto-compress $^ | tar -x -C $(DESTDIR)$(app_dir)
	@mkdir -v -p $(addprefix $(DESTDIR)$(app_dir)/, log tmp )

clean:
	make -C debian clean

.PHONY: package
package: chlog
	@$(info:msg=Building JS)
	yarn build
	@$(info:msg=Building package)
	dpkg-buildpackage -us -uc -b

.PHONY: chlog
chlog: clean-chlog
ifeq "$(auto_chlog)" "no"
	@$(info:msg=Skipping changelog generation)
else
	@$(info:msg=Generating changelog Supply auto_chlog=no to skip.)
	@which changelog-gen || { $(err:msg=Failed to generate changelog. Did you install git-changelog package?) && false; }
	changelog-gen -p "$(pkg_name)" -d "$(debian_host_release)" -A "s/_/~/g" "s/-master/~master/" "s/-rc/~rc/"
	cat debian/changelog
endif


.PHONY: clean-chlog
clean-chlog:
ifneq "$(auto_chlog)" "no"
	@$(info:msg=Removing changelog)
	@rm -vf debian/changelog
endif

