import { Category } from 'src/app/core/models/category.models';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChanges,
  OnChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/core/models/order.modules';
import { User } from 'src/app/core/models/user.models';
import { Role } from 'src/app/core/models/role.models';
import { ProductTable } from 'src/app/core/models/product.models';

type DataSourceData = Role[] | User[] | ProductTable[] | Category[] | Order[];

@Component({
  selector: 'app-table-admin',
  templateUrl: './table-admin.component.html',
  styleUrls: ['./table-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableAdminComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() public displayedColumns: string[];
  @Input() public data: DataSourceData;
  @Input() public link!: string;

  @Output() public EmmitIdItemToDelete: EventEmitter<string> = new EventEmitter();
  @Output() public EmmitIdItemToRestore: EventEmitter<string> = new EventEmitter();

  public dataSource = new MatTableDataSource<DataSourceData>();
  public columns: string[] = [];
  public isLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private readonly cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cd.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoading = true;

    this.dataSource = new MatTableDataSource(changes['data'].currentValue);
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.columns = [...this.displayedColumns, 'actions'];
    console.log(this.columns);
  }

  public removeItem(id: string): void {
    this.EmmitIdItemToDelete.emit(id);
  }

  public restoreItem(id: string): void {
    this.EmmitIdItemToRestore.emit(id);
  }
}
